function setReportHeaders(format, response) {
  switch (format) {
    case "csv":
      response.setHeader("Content-Type", "text/csv");
      response.setHeader(
        "Content-Disposition",
        "attachment; filename=character-report.csv"
      );
      break;

    case "pdf":
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader(
        "Content-Disposition",
        "attachment; filename=character-report.pdf"
      );
      break;

    case "xlsx":
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.setHeader(
        "Content-Disposition",
        "attachment; filename=character-report.xlsx"
      );
      break;

    default:
      break;
  }
  return;
}

module.exports = setReportHeaders;
