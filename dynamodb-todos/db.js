import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "TodoTable";

export async function addItem(item) {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  try {
    const resp = await dynamoDB.put(params).promise();
    console.log(resp);
  } catch (error) {
    console.log("Error adding item to DB", error);
  }
}

export async function getAllItems() {
  const params = {
    TableName: TABLE_NAME,
  };
  let todos;
  try {
    const res = await dynamoDB.scan(params).promise();
    todos = res.Items;

    console.log(todos);
  } catch (error) {
    console.log("Error retrieving items", error);
  }
  return todos;
}

export async function getItem(todoId) {
  const params = {
    TableName: TABLE_NAME,
    Key: todoId,
  };
  let todo;
  try {
    const res = await dynamoDB.get(params).promise();
    todo = res.Item;
    console.log(todo);
  } catch (error) {
    console.log("Error retrieving item", error);
  }
  return todo;
}

export async function editItem(todoId, updates) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      TodoId: todoId,
    },
    UpdateExpression: "set TodoName = :name, Completed = :completed",
    ExpressionAttributeValues: {
      ":name": updates.TodoName,
      ":completed": updates.Completed,
    },
    ReturnValues: "UPDATED_NEW",
  };
  try {
    const res = await dynamoDB.update(params).promise();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItem(todoId) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      TodoId: todoId,
    },
  };
  try {
    const res = await dynamoDB.delete(params).promise();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
