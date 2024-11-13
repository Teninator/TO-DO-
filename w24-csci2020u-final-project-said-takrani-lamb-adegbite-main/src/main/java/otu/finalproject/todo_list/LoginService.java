package otu.finalproject.todo_list;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Servlet mapping for handling login requests
@WebServlet(urlPatterns = "/index.html")
public class LoginService extends HttpServlet
{

    // Method to check if the provided user credentials are valid
    public boolean isUserValid(String user, String password)
    {
        // Hardcoded user credentials for demonstration purposes
        if (user.equals("User1") && password.equals("12345"))
        {
            return true;
        } else if (user.equals("User2") && password.equals("12345")) {
            return true;
        } else if (user.equals("User3") && password.equals("12345")) {
            return true;
        } else if (user.equals("User4") && password.equals("12345")) {
            return true;
        } else {
            return false;
        }
    }

    // Handling GET requests
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        // Forwarding the request to the login.jsp view for rendering
        request.getRequestDispatcher("WEB-INF/views/login.jsp").forward(request, response);
    }

    // Handling POST requests
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        // Retrieving user inputs from the login form
        String name = request.getParameter("Insert User");
        String password = request.getParameter("Insert Password");

        // Checking if the provided user credentials are valid
        boolean isUserValid = isUserValid(name, password);

        if (isUserValid) {
            // If credentials are valid, setting the user's name in the session and redirecting to list-todos.do
            request.getSession().setAttribute("name", name);
            response.sendRedirect("/list-todos.do");
        } else {
            // If credentials are invalid, setting an error message attribute and forwarding back to the login page
            request.setAttribute("errorMessage", "Invalid Credentials!");
            request.getRequestDispatcher("WEB-INF/views/login.jsp").forward(request, response);
        }
    }
}
