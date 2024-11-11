export const handler = async (event) => {
  let todos = [
    {
      id: 1,
      name: "todo 1",
      completed: false,
    },
  ];
  let resp;

  const { httpMethod, pathParameters, body } = event;
  const id = pathParameters?.id;

  try {
    switch (httpMethod) {
      case "GET":
        // Return all todos
        resp = {
          statusCode: 200,
          body: JSON.stringify({ todos, success: true }),
        };
        break;

      case "POST":
        // Add a new todo
        const newTodo = JSON.parse(body);
        newTodo.id = Math.floor(Math.random() * 1000);
        todos.push(newTodo);
        resp = {
          statusCode: 201,
          body: JSON.stringify({ todos, success: true, newTodo }),
        };
        break;

      case "DELETE":
        // Delete all todos
        todos = [];
        resp = {
          statusCode: 200,
          body: JSON.stringify({ message: "All todos deleted", success: true }),
        };
        break;

      default:
        // Unsupported HTTP method
        resp = {
          statusCode: 405,
          body: JSON.stringify({
            message: "Method Not Allowed",
            success: false,
          }),
        };
        break;
    }
  } catch (error) {
    // Handle errors
    resp = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        success: false,
        error,
      }),
    };
  }

  return resp;
};
