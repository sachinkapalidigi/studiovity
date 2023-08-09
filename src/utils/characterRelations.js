const Relation = require("../models/relation.model");

class CharacterRelations {
  constructor(characterId, returnNested = false) {
    this.characterId = characterId;
    this.returnNested = returnNested;
    this.visitedCharacters = new Set();
  }

  async fetchRelationships(characterId) {
    // Check if the character was already visited
    if (visitedCharacters.has(characterId.toString())) {
      return [];
    }

    visitedCharacters.add(characterId.toString());

    // Fetch the direct relationships of the character
    const relations = await Relation.find({
      $or: [{ sourceCharacter: characterId }, { targetCharacter: characterId }],
    }).populate("sourceCharacter targetCharacter");

    if (!this.returnNested) return relations;
    // Fetch relationships of related characters (recursively)
    for (const relation of relations) {
      const nextCharacterId = relation.sourceCharacter._id.equals(characterId)
        ? relation.targetCharacter._id
        : relation.sourceCharacter._id;

      const nestedRelations = await fetchRelationships(nextCharacterId);

      // Add nested relations to the current relation (or structure them as desired)
      relation._doc.nestedRelations = nestedRelations;
    }

    return relations;
  }
}

module.exports = CharacterRelations;
