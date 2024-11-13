package otu.finalproject.todo_list;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.HashMap;
import java.util.Map;


@Path("/resource")
public class HelloResource {
    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello, World!";
    }


    @POST
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_HTML)
    public Response POSTjson(String payload){
        /*
        Parameters: HTML payload from client
        Returns: JSON object
        This function takes the HTML of the to-do list,
        parses it using jsoup, extracting the task, it's category, and
        the due date in the process. It then formats this data into a JSON
        string, which it then sends as a JSON
         */

        StringBuilder jsonTasks = new StringBuilder();

        jsonTasks.append("{\n" +
                "  \"tasks\": [\n");

        Document doc = Jsoup.parse(payload);

        Elements todoItems = doc.select("li.todo-item");

        for (Element todoItem : todoItems) {
            jsonTasks.append("{\n");

            String task = todoItem.select("label").text();
            String category = todoItem.select("p").text();
            String dueDate = todoItem.select("span").text().replace("Due: ", "");

            jsonTasks.append("\"task\":\"").append(task).append("\",\n");
            jsonTasks.append("\"category\":\"").append(category).append("\",\n");
            jsonTasks.append("\"due date\":\"").append(dueDate).append("\",\n");
            jsonTasks.append("},\n");
        }

        jsonTasks.append("  ]\n" +
                "}");

        return Response.status(200)
                .header("Content-Disposition", "attachment;filename=\"tasks.json\"")
                .entity(jsonTasks.toString())
                .build();

    }


    @POST
    @Path("/loginAuth")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response authLogin(String payload){
        /*
        Parameters: String payload, text/plain but formatted as a csv with 2 entries
        Returns: Response containing boolean value true or false

        This function has a list of accepted login credentials, and compares each
        to the parameter string that represents the user username and password sent from the client
        in the format: username,password.
        If the user username and password matches any of the accepted credentials, true is returned, else false
         */

        Boolean authstatus = false;

        String loginInfo = payload.replaceAll("\\s","");
        System.out.println(loginInfo);
        String[] acceptedLoginCredentials = new String[5];

        acceptedLoginCredentials[0] = ("User1,12345");
        acceptedLoginCredentials[1] = ("User2,12345");
        acceptedLoginCredentials[2] = ("User3,12345");
        acceptedLoginCredentials[3] = ("User4,12345");
        acceptedLoginCredentials[4] = ("User5,12345");


        for (int i = 0;i< acceptedLoginCredentials.length;i++) {

            if(loginInfo.equals(acceptedLoginCredentials[i])){
                authstatus = true;
            }
        }

        return Response.status(200)
                .entity(authstatus.toString())
                .build();

    }
}