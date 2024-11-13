package otu.finalproject.todo_list;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(urlPatterns = "/logout.do")
public class LogoutService extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException
    {
        try
        {
            // Invalidate the current session if it exists
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            // Redirect to login page
            response.sendRedirect(request.getContextPath() + "/login.jsp");
        }
        catch (IllegalStateException e)
        {
            // Log the exception (optional)
            e.printStackTrace();
            // Redirect to error page if any exception occurs
            response.sendRedirect(request.getContextPath() + "/client/404.html");
        }
    }
}
