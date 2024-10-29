import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "Todos";

export async function addItem(item) {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  try {
    const resp = await dynamoDB.put(params).promise();
    console.log(resp);
  } catch (error) {
    console.log("Error adding Item", error);
  }
}

export const getItem = async (key) => {
  const params = {
    TableName: TABLE_NAME,
    Key: key,
  };
  let todo;
  try {
    const data = await dynamoDB.get(params).promise();
    todo = data.Item;
    console.log("Item retrieved:", data.Item);
  } catch (error) {
    console.error("Error retrieving item:", error);
  }
  return todo;
};

export const getAllItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  let todos;
  try {
    // Perform the scan operation
    const scanResult = await dynamoDB.scan(params).promise();
    todos = scanResult.Items;

    // Output the retrieved items
    console.log("All Items:", JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error retrieving items:", error);
  }
  return todos;
};

export async function getTableInfo() {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const resp = await dynamoDB.describeTable(params).promise();
    console.log("Table info", JSON.stringify(resp.table, null, 2));
  } catch (error) {
    console.log("Error retrieving table info", error);
  }
}

export async function editItem(todoId, updates) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      TodoId: todoId, // Assuming 'TodoId' is the primary key for the Todos table
    },
    UpdateExpression: "set TodoName = :name, Completed = :completed",
    ExpressionAttributeValues: {
      ":name": updates.TodoName,
      ":completed": updates.Completed,
    },
    ReturnValues: "UPDATED_NEW", // Returns the updated attributes
  };

  try {
    const resp = await dynamoDB.update(params).promise();
    console.log("Item updated:", resp.Attributes);
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

export async function deleteItem(todoId) {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      TodoId: todoId, // Primary key for deletion
    },
  };

  try {
    const resp = await dynamoDB.delete(params).promise();
    console.log("Item deleted:", resp);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
