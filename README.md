# Character API Documentation 
**Import POSTMAN COLLECTION JSON if needed**

## Overview
This API provides CRUD functionalities for screenplay characters, their relationships, and associated photos.

## Characters Base URL
`/v1/characters`

## Endpoints

### Create Character

- **Endpoint**: `/v1/characters/`
- **Method**: `POST`
- **Description**: Create a new character.
- **Request Payload**:
```json
{
  "name": "Character Name",
  "age": 30,
  "gender": "male/female/other",
  "occupation": "Character's occupation"
}
```

- **Response**:
- **HTTP Status** : `201` Created
- **Body** :
```json
{
  "status": "success",
  "data": {
    "character": {
      "_id": "Character unique ID",
      "name": "Character Name",
      "age": 30,
      "gender": "male/female/other",
      "occupation": "Character's occupation",
      "photos": []
    }
  }
}
```

---

### Get Character

- **Endpoint**: `/v1/characters/:id`
- **Method**: `GET`
- **Description**: Retrieve details of a specific character by ID.
  
- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {
    "character": {
      "_id": "Character unique ID",
      "name": "Character Name",
      "age": 30,
      "gender": "male/female/other",
      "occupation": "Character's occupation",
      "photos": []
    }
  }
}
```

---

### Update Character

- **Endpoint**: `/v1/characters/:id`
- **Method**: `PUT`
- **Description**: Update a specific character's details.
- **Request Payload**:
```json
{
  "name": "New Character Name",
  "age": 35,
  "gender": "male/female/other",
  "occupation": "New Occupation"
}
```

- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {
    "character": {
      "_id": "Character unique ID",
      "name": "New Character Name",
      "age": 35,
      "gender": "male/female/other",
      "occupation": "New Occupation",
      "photos": []
    }
  }
}
```

---

### Delete Character

- **Endpoint**: `/v1/characters/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specific character by ID.

- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "deleted",
  "data": {}
}
```

---

### Get Character Relationships

- **Endpoint**: `/v1/characters/:id/relationships`
- **Method**: `GET`
- **Description**: Retrieve relationships associated with a specific character by ID.

- **Request Query Parameters**: `?returnNested=true`

- **NOTE**: This response contains duplicate relationships, flatten then for usage.
- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {
    "relationships": [
      {
        "_id": "5f50a521d0b3b30dc816a1ad",
        "sourceCharacter": {
          "_id":"5f50a521d0b3b30dc816a1ad",
          "name": "Character A",
        },
        "relationshipType": "son",
        "reverseRelationshipType": "father",
        "targetCharacter": {
          "_id": "5f50a521d0b3b30dc816a1ae",
          "name": "Character B"
        },
        "nestedRelations": [{
          "_id": "5f50a521d0b3b30dc816a1af",
          "relationshipType": "husband",
          "reverseRelationshipType": "husband",
          "sourceCharacter": {
            "_id": "5f50a521d0b3b30dc816a1ae",
            "name": "Character B"
          },
          "targetCharacter": {
            "_id": "5f50a521d0b3b30dc816a1ae",
            "name": "Character C"
          },
          "nestedRelations": [{
            // and so on
          }]
        }]
      }
    ]
  }
}
```

---

### Upload Character Photos

- **Endpoint**: `/v1/characters/:id/photos`
- **Method**: `POST`
- **Description**: Upload photos associated with a specific character by ID.

- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {
    "photos": ["url1", "url2"]
  }
}
```

---

### Get Character Report

- **Endpoint**: `/v1/characters/:id/download`
- **Method**: `GET`
- **Description**: Retrieve details of a specific character by ID.
- **Query Params**: `?format=pdf`
- **Format options**: `pdf, csv, xlsx`
  
- **Response**:
- **HTTP Status** : `200` OK
- **Body** : Returns PDF, CSV or XLSX file as per format specified in request

---

### Get Relationship Between Two Characters

- **Endpoint**: `/v1/relationships/`
- **Method**: `GET`
- **Description**: Fetches the relationship between two characters.
- **Query Parameters**: `?characterA=xyz123&characterB=xyz213`
```json
{
  "characterA": "Character ID 1",
  "characterB": "Character ID 2"
}
```

- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {
    "relationship": {
      "relationshipType": "Type of Relationship (e.g. father, mother, sibling)",
      "reverseRelationshipType": "Reverse Type of Relationship",
      "sourceCharacter": {
        // source character details
      },
      "targetCharacter": {
        // target character details
      }
    }
  }
}
```

---

### Create Relationship

- **Endpoint**: `/v1/relationships/`
- **Method**: `POST`
- **Description**: Create a new relationship between two characters.
- **Request Payload**:
```json
{
  "relationshipType": "Type of Relationship (e.g. father, mother, sibling)",
  "reverseRelationshipType": "Reverse Type of Relationship",
  "sourceCharacter": "Source Character ID",
  "targetCharacter": "Target Character ID"
}
```

- **Response**:
- **HTTP Status** : `201` Created
- **Body** :
```json
{
  "status": "success",
  "data": {
    "relationship": {
      "relationshipType": "Type of Relationship (e.g. father, mother, sibling)",
      "reverseRelationshipType": "Reverse Type of Relationship",
      "sourceCharacter": {
        // source character details
      },
      "targetCharacter": {
        // target character details
      }
    }
  }
}
```

---

### Get Relationship By ID

- **Endpoint**: `/v1/relationships/:id`
- **Method**: `GET`
- **Description**: Fetches a relationship by its ID.
- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {
    "relationship": {
      "relationshipType": "Type of Relationship (e.g. father, mother, sibling)",
      "reverseRelationshipType": "Reverse Type of Relationship",
      "sourceCharacter": {
        // source character details
      },
      "targetCharacter": {
        // target character details
      }
    }
  }
}
```

---

### Update Relationship

- **Endpoint**: `/v1/relationships/:id`
- **Method**: `PUT`
- **Description**: Updates a relationship by its ID.
- **Request Payload**:
```json
{
  "relationshipType": "Updated Relationship Type",
  "reverseRelationshipType": "Updated Reverse Relationship Type",
  "sourceCharacter": "Updated Source Character ID",
  "targetCharacter": "Updated Target Character ID"
}
```

- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {
    "relationship": {
      // Updated relationship details here
    }
  }
}
```

---

### Delete Relationship

- **Endpoint**: `/v1/relationships/:id`
- **Method**: `DELETE`
- **Description**: Deletes a relationship by its ID.
- **Response**:
- **HTTP Status** : `200` OK
- **Body** :
```json
{
  "status": "success",
  "data": {}
}
```

---
