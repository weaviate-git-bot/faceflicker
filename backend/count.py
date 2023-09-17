import weaviate

client = weaviate.Client("http://localhost:8080")

def count():
    className = "Picture"
    count = (
        client.query
        .aggregate(className)
        .with_where({
            "path": ["category"],
            "operator": "Equal",
            "valueText": "Animal"
        })
        .with_meta_count().do()
    )

    if 'errors' in count:
        print(count['errors'][0]['message'])
    else:
        count = count['data']['Aggregate'][className][0]['meta']['count']
        print(count)

def delete():
    result = (
        client.batch.delete_objects(
            class_name='Picture',
            where={
                'path': ['name'],
                'operator': 'Equal',
                'valueText': 'Rocky'
            },
        )
    )
    print(result)

count()
# delete()