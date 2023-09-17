import weaviate

client = weaviate.Client("http://localhost:8080")
# schema = client.schema.get()
# print(schema)
client.schema.delete_class("Picture")