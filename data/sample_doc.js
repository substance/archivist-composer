var sampleDoc = {
  "id": "9cc2e4def8b39bc234bf5e186bafa743",
  "schema": [
    "substance-interview",
    "0.1.0"
  ],
  "nodes": {
    "document": {
      "id": "document",
      "type": "document",
      "containers": [
        "content"
      ],
      "guid": "9cc2e4def8b39bc234bf5e186bafa743",
      "creator": "",
      "title": "Test",
      "authors": ["Micheal Aufreiter"],
      "abstract": "Test",
      "created_at": "2015-03-04T10:56:18.229Z",
      "updated_at": "2015-03-04T10:56:47.425Z",
      "published_on": "2015-03-04T10:56:18.230Z"
    },
    "cover": {
      "id": "cover",
      "type": "cover"
    },
    "content": {
      "type": "view",
      "id": "content",
      "nodes": [
        "cover",
        "text1",
        "a8d75e63fca0043bacc548d2bc8db7d8"
      ]
    },
    "text1": {
      "type": "text",
      "id": "text1",
      "content": "Paragraph 1"
    },
    "text_a8d75e63fca0043bacc548d2bc8db7d8": {
      "type": "text",
      "id": "a8d75e63fca0043bacc548d2bc8db7d8",
      "source_id": "",
      "content": "Paragraph 2"
    }
  }
};

module.exports = sampleDoc;