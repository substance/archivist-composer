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
      "title": "Test document",
      "abstract": "Test",
      "created_at": "2015-03-04T10:56:18.229Z",
      "updated_at": "2015-03-04T10:56:47.425Z",
      "published_on": "2015-03-04T10:56:18.230Z"
    },
    "content": {
      "type": "container",
      "id": "content",
      "nodes": [
        "text_1",
        "text_2"
      ]
    },
    "text_1": {
      "type": "text",
      "id": "text_1",
      "content": 'Lorem ipsum <span data-id="strong_1" class="annotation strong">dolor sit amet</span>, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },
    "entity_reference_1": {
      "id": "entity_reference_1",
      "type": "entity_reference",
      "path": [
        "text_54",
        "content"
      ],
      "range": [
        85,
        95
      ]
    },
    "text_2": {
      "type": "text",
      "id": "text_2",
      "content": 'Proin in luctus sapien, <span data-id="entity_reference_1" class="annotation entity-reference">ultrices commodo augue</span>. Phasellus ultrices commodo augue, in blandit nibh luctus ac. Aliquam euismod nibh vitae erat pulvinar, at semper libero tincidunt. Nulla finibus est ac consequat consequat. Sed at condimentum purus. Aliquam vulputate ipsum ut justo posuere, quis varius risus finibus. Ut scelerisque laoreet vehicula. Nullam gravida fringilla justo, nec efficitur nunc sagittis et. Suspendisse nibh ligula, imperdiet id interdum et, sollicitudin non mauris. Suspendisse potenti. Suspendisse luctus iaculis nulla sed efficitur. Nullam sed viverra metus. Etiam dictum blandit enim tincidunt maximus. Nullam tempus nibh at varius interdum.'
    }
  }
};

module.exports = sampleDoc;