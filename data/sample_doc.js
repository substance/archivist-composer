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
      // General stuff
      "guid": "9cc2e4def8b39bc234bf5e186bafa743",
      "creator": "",
      "title": "Test document",
      "abstract": "Russian abstract",
      "abstract_en": "Enter english abstract here",
      "created_at": "2015-03-04T10:56:18.229Z",
      "updated_at": "2015-03-04T10:56:47.425Z",
      "published_on": "2015-03-04",

      // Project related
      "project_name": "Internationales Sklaven-und Zwangsarbeiter Befragungsprojekt",
      "project_location": "54ef1331afda2d3c024e4817",
      "conductor": "Irina Ostrovskaya",
      "operator": "Eduard Kechedjiyan",
      "sound_operator": "Eduard Kechedjiyan",
      "record_type": "video",
      "media_id": "",
      "interview_location": "respondent's apartment",
      "interview_date": "2005-07-16",
      "persons_present": "Nikolay Bogoslavec, Irina Ostrovskaya, Eduard Kechedjiyan, Alexey Bogoslavec",
      "interview_duration": "247",

      // Interview subject related
      "interviewee_bio": "Please enter interview subject bio.",
      "interviewee_category": "Ost-Arbeiter, concentration camp prisoner",
      "interviewee_prisons": ["54ef1331afda2d3c024e4817", "54ef1331afda2d3c024e4818"],
      "interviewee_forced_labor_type": "intracamp work, earthworks (construction of barracks), digging tunnels for military factories",
      "interviewee_waypoints": ["waypoint_1", "waypoint_2"],

      // Workflow
      "transcripted": false,
      "verified": false,
      "finished": false
    },
    "waypoint_1": {
      "id": "waypoint_1",
      "type": "waypoint",
      "entityId": "54ef1331afda2d3c024e4817",
      "density": 4
    },
    "waypoint_2": {
      "id": "waypoint_2",
      "type": "waypoint",
      "entityId": "54ef1331afda2d3c024e4817",
      "density": 2
    },

    "content": {
      "type": "container",
      "id": "content",
      "nodes": [
        "text_1",
        "table_1",
        "text_2",
        "text_3",
        "text_4",
        "text_5"
      ]
    },
    "text_1": {
      "type": "text",
      "id": "text_1",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },

    "table_1": {
      "type": "table",
      "id": "table_1",
      "rows": ["tr_1", "tr_2", "tr_3", "tr_4", "tr_5", "tr_6"]
    },
    "tr_1": {
      "type": "table_row",
      "id": "tr_1",
      "cells": ["td_1", "td_2", "td_3", "td_4", "td_5", "td_6"]
    },
    "tr_2": {
      "type": "table_row",
      "id": "tr_2",
      "cells": ["td_21", "td_22", "td_23", "td_24", "td_25", "td_26"]
    },
    "tr_3": {
      "type": "table_row",
      "id": "tr_3",
      "cells": ["td_31", "td_32", "td_33", "td_34", "td_35", "td_36"]
    },
    "tr_4": {
      "type": "table_row",
      "id": "tr_4",
      "cells": ["td_41", "td_42", "td_43", "td_44", "td_45", "td_46"]
    },
    "tr_5": {
      "type": "table_row",
      "id": "tr_5",
      "cells": ["td_51", "td_52", "td_53", "td_54", "td_55", "td_56"]
    },
    "tr_6": {
      "type": "table_row",
      "id": "tr_6",
      "cells": ["td_61", "td_62", "td_63", "td_64", "td_65", "td_66"]
    },
    "td_1": {
      "type": "table_cell",
      "id": "td_1",
      "content": "A",
      "cellType": "head"
    },
    "td_2": {
      "type": "table_cell",
      "id": "td_2",
      "content": "B",
      "cellType": "head"
    },
    "td_3": {
      "type": "table_cell",
      "id": "td_3",
      "content": "C",
      "cellType": "head"
    },
    "td_4": {
      "type": "table_cell",
      "id": "td_4",
      "content": "D",
      "cellType": "head"
    },
    "td_5": {
      "type": "table_cell",
      "id": "td_5",
      "content": "E",
      "cellType": "head"
    },
    "td_6": {
      "type": "table_cell",
      "id": "td_6",
      "content": "F",
      "cellType": "head"
    },
    "td_11": {
      "type": "table_cell",
      "id": "td_11",
      "content": "a",
      "cellType": "data"
    },
    "td_12": {
      "type": "table_cell",
      "id": "td_12",
      "content": "b",
      "cellType": "data"
    },
    "td_13": {
      "type": "table_cell",
      "id": "td_13",
      "content": "c",
      "cellType": "data"
    },
    "td_14": {
      "type": "table_cell",
      "id": "td_14",
      "content": "d",
      "cellType": "data"
    },
    "td_15": {
      "type": "table_cell",
      "id": "td_15",
      "content": "e",
      "cellType": "data"
    },
    "td_16": {
      "type": "table_cell",
      "id": "td_16",
      "content": "f",
      "cellType": "data"
    },
    "td_21": {
      "type": "table_cell",
      "id": "td_21",
      "content": "a",
      "cellType": "data"
    },
    "td_22": {
      "type": "table_cell",
      "id": "td_22",
      "content": "b",
      "cellType": "data"
    },
    "td_23": {
      "type": "table_cell",
      "id": "td_23",
      "content": "c",
      "cellType": "data"
    },
    "td_24": {
      "type": "table_cell",
      "id": "td_24",
      "content": "d",
      "cellType": "data"
    },
    "td_25": {
      "type": "table_cell",
      "id": "td_25",
      "content": "e",
      "cellType": "data"
    },
    "td_26": {
      "type": "table_cell",
      "id": "td_26",
      "content": "f",
      "cellType": "data"
    },
    "td_31": {
      "type": "table_cell",
      "id": "td_31",
      "content": "a",
      "cellType": "data"
    },
    "td_32": {
      "type": "table_cell",
      "id": "td_32",
      "content": "b",
      "cellType": "data"
    },
    "td_33": {
      "type": "table_cell",
      "id": "td_33",
      "content": "c",
      "cellType": "data"
    },
    "td_34": {
      "type": "table_cell",
      "id": "td_34",
      "content": "d",
      "cellType": "data"
    },
    "td_35": {
      "type": "table_cell",
      "id": "td_35",
      "content": "e",
      "cellType": "data"
    },
    "td_36": {
      "type": "table_cell",
      "id": "td_36",
      "content": "f",
      "cellType": "data"
    },
    "td_41": {
      "type": "table_cell",
      "id": "td_41",
      "content": "a",
      "cellType": "data"
    },
    "td_42": {
      "type": "table_cell",
      "id": "td_42",
      "content": "b",
      "cellType": "data"
    },
    "td_43": {
      "type": "table_cell",
      "id": "td_43",
      "content": "c",
      "cellType": "data"
    },
    "td_44": {
      "type": "table_cell",
      "id": "td_44",
      "content": "d",
      "cellType": "data"
    },
    "td_45": {
      "type": "table_cell",
      "id": "td_45",
      "content": "e",
      "cellType": "data"
    },
    "td_46": {
      "type": "table_cell",
      "id": "td_46",
      "content": "f",
      "cellType": "data"
    },
    "td_51": {
      "type": "table_cell",
      "id": "td_51",
      "content": "a",
      "cellType": "data"
    },
    "td_52": {
      "type": "table_cell",
      "id": "td_52",
      "content": "b",
      "cellType": "data"
    },
    "td_53": {
      "type": "table_cell",
      "id": "td_53",
      "content": "c",
      "cellType": "data"
    },
    "td_54": {
      "type": "table_cell",
      "id": "td_54",
      "content": "d",
      "cellType": "data"
    },
    "td_55": {
      "type": "table_cell",
      "id": "td_55",
      "content": "e",
      "cellType": "data"
    },
    "td_56": {
      "type": "table_cell",
      "id": "td_56",
      "content": "f",
      "cellType": "data"
    },
    "td_61": {
      "type": "table_cell",
      "id": "td_61",
      "content": "a",
      "cellType": "data"
    },
    "td_62": {
      "type": "table_cell",
      "id": "td_62",
      "content": "b",
      "cellType": "data"
    },
    "td_63": {
      "type": "table_cell",
      "id": "td_63",
      "content": "c",
      "cellType": "data"
    },
    "td_64": {
      "type": "table_cell",
      "id": "td_64",
      "content": "d",
      "cellType": "data"
    },
    "td_65": {
      "type": "table_cell",
      "id": "td_65",
      "content": "e",
      "cellType": "data"
    },
    "td_66": {
      "type": "table_cell",
      "id": "td_66",
      "content": "f",
      "cellType": "data"
    },

    "text_2": {
      "type": "text",
      "id": "text_2",
      "content": 'Proin in luctus sapien, ultrices commodo augue. Phasellus ultrices commodo augue, in blandit nibh euismod nibh vitae erat luctus ac. Aliquam euismod nibh vitae erat pulvinar, at semper libero tincidunt. Nulla finibus est ac consequat consequat. Sed at condimentum purus. Aliquam vulputate ipsum ut justo posuere, quis varius risus finibus. Ut scelerisque laoreet vehicula. Nullam gravida fringilla justo, nec efficitur nunc sagittis et. Suspendisse nibh ligula, imperdiet id interdum et, sollicitudin non mauris. Suspendisse potenti. Suspendisse luctus iaculis nulla sed efficitur. Nullam sed viverra metus. Etiam dictum blandit enim tincidunt maximus. Nullam tempus nibh at varius interdum.'
    },

    "entity_reference_1": {
      "id": "entity_reference_1",
      "type": "entity_reference",
      "path": [
        "text_2",
        "content"
      ],
      "target": "54ef1331afda2d3c024e4817", // this is an external object
      "startOffset": 24,
      "endOffset": 47
    },

    "subject_reference_1": {
      "id": "subject_reference_1",
      "type": "subject_reference",
      "container": "content",
      "startPath": ["text_2", "content"],
      "startOffset": 10,
      "endPath": ["text_4", "content"],
      "endOffset": 40,
      "target": ["54bae99ca868bc3ec7fb5ad8"]
    },

    "subject_reference_2": {
      "id": "subject_reference_2",
      "type": "subject_reference",
      "container": "content",
      "startPath": ["text_1", "content"],
      "startOffset": 100,
      "endPath": ["text_2", "content"],
      "endOffset": 200,
      "target": ["54bae4cda868bc6fab4bcd0e", "54bae99ca868bc3ec7fb5ad8"]
    },

    "remark_1": {
      "id": "remark_1",
      "type": "remark",
      "container": "content",
      "startPath": ["text_1", "content"],
      "startOffset": 20,
      "endPath": ["text_2", "content"],
      "endOffset": 298,
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit."
    },

    "remark_2": {
      "id": "remark_2",
      "type": "remark",
      "container": "content",
      "startPath": ["text_2", "content"],
      "startOffset": 300,
      "endPath": ["text_2", "content"],
      "endOffset": 520,
      "content": "Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut."
    },

    "text_3": {
      "type": "text",
      "id": "text_3",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },

    "text_4": {
      "type": "text",
      "id": "text_4",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },

    "text_5": {
      "type": "text",
      "id": "text_5",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    }

  }
};

module.exports = sampleDoc;