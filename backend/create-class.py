import weaviate

client = weaviate.Client("http://localhost:8080")

class_obj = {
    "class": "Picture",
    "vectorizer": "img2vec-neural",
    "vectorIndexType": "hnsw",
    "moduleConfig": {
        'img2vec-neural':{
            'imageFields': [
                'image'    
            ]    
        }
    },
    'properties': [
        {
            "name": "image",
            "dataType": ["blob"]
        },
        {
            "name": "name",
            "dataType": ["string"]    
        },
        {
            "name": "category",
            "dataType": ["string"]
        }
    ]
}

if not client.schema.exists(class_name="Picture"):
    client.schema.create_class(class_obj)
    print("class created")
else:
    print("class already exists")