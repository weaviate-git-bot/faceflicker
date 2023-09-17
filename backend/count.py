import weaviate

client = weaviate.Client("http://localhost:8080")

def count():
    className = "Picture"
    count = (
        client.query
        .aggregate(className)
        # .with_where({
        #     "path": ["name"],
        #     "operator": "Equal",
        #     "valueText": person_name
        # })
        .with_meta_count().do()
    )

    if 'errors' in count:
        print(count['errors'][0]['message'])
    else:
        count = count['data']['Aggregate'][className][0]['meta']['count']
        print(count)

count()