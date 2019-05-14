package eu.lundegaard.sdp.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Kafka Connect API proxy.
 * This class is used to bridge the front end of this application with the server running Kafka Connect.
 * @author Martin Kocisky
 */
@RestController
public class KafkaConnectController {

    /**
     * Logger for this class.
     */
    private static final Logger LOG = LoggerFactory.getLogger(KafkaConnectController.class);

    /**
     * REST client for forwarding the requests to other server.
     */
    private static RestTemplate restTemplate = new RestTemplate();

    /**
     * URI with port of the server running Kafka Connect API
     */
    @Value("services.kafkaConnectAddress")
    private String kafkaConnectAddress;

    /**
     * Overloaded method in case the request body is empty.
     * @param httpServletRequest original request
     * @return
     */
    private ResponseEntity restProxyForward(HttpServletRequest httpServletRequest) {
        return restProxyForward(httpServletRequest, "");
    }

    /**
     * Method used to forward REST requests to other server for Kafka Connect.
     * @param httpServletRequest original request
     * @param body of the request is any
     * @return
     */
    private ResponseEntity restProxyForward(HttpServletRequest httpServletRequest, String body) {
        String path = httpServletRequest.getPathInfo();
        HttpMethod httpMethod = HttpMethod.resolve(httpServletRequest.getMethod());

        URI uri;
        try {
            uri = new URI(kafkaConnectAddress + path);
        } catch (URISyntaxException e) {
            LOG.info("Incorrect URI for Kafka Connect.");
            return new ResponseEntity(HttpStatus.BAD_GATEWAY);
        }
        HttpEntity<String> entity = new HttpEntity<>(body);         
        return restTemplate.exchange(uri, httpMethod, entity, String.class);
    }

    /**
     * This test method returns a simple string message indicating that Kafka Connect API is accessible.
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/apiTest", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getApiTest() {
        LOG.info("Kafka Connect apiTest");
        return new ResponseEntity("Kafka Connect API is accessible!", HttpStatus.OK);
    }

    /**
     * This method returns all the connectors on Kafka Connect.
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getConnectors(HttpServletRequest request) {
        LOG.info("Get all Kafka Connect connectors");
        return restProxyForward(request);
    }

    /**
     * This method is used to modify the connectors on Kafka Connect.
     * @param data
     * @param body
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity postConnectors(@RequestBody String data, @RequestBody String body, HttpServletRequest request) {
        LOG.info("Post new Kafka Connect connector");
        return restProxyForward(request, body);
    }

    /**
     * This method returns a connector with specified name.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getConnectorWithName(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Get Kafka Connect connector with name: {}", name);
        return restProxyForward(request);
    }

    /**
     * This method returns a configuration for specified connector.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/config", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getConnectorWithNameConfig(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Get Kafka Connect connector configuration for: {}", name);
        return restProxyForward(request);
    }

    /**
     * This method updates the configuration of the specified connector.
     * @param name
     * @param body
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/config", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
    public ResponseEntity putConnectorWithNameConfig(@PathVariable String name, @RequestBody String body, HttpServletRequest request) {
        LOG.info("Change Kafka Connect connector configuration for: {}", name);
        return restProxyForward(request, body);
    }

    /**
     * This method returns the status of specified connector.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/status", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity getConnectorWithNameStatus(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Get Kafka Connect connector status for: {}", name);
        return restProxyForward(request);
    }

    /**
     * This method issues a Restart request for the specified connector.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/restart", method = RequestMethod.POST)
    public ResponseEntity postConnectorWithNameRestart(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Restart Kafka Connect connector for: {}", name);
        return restProxyForward(request);
    }

    /**
     * This method issues a Pause request for the specified connector.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/pause", method = RequestMethod.PUT)
    public ResponseEntity putConnectorWithNamePause(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Pause Kafka Connect connector for: {}", name);
        return restProxyForward(request);
    }

    /**
     * This method issues a Resume request for the specified connector.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/resume", method = RequestMethod.PUT)
    public ResponseEntity putConnectorWithNameResume(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Resume Kafka Connect connector for: {}", name);
        return restProxyForward(request);    
    }

    /**
     * This method issues a Delete request for the specified connector.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}", method = RequestMethod.DELETE)
    public ResponseEntity deleteConnectorWithName(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Delete Kafka Connect connector for: {}", name);
        return restProxyForward(request);
    }

    /**
     * This method returns a list of tasks for the specified connector.
     * @param name
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/tasks", method = RequestMethod.GET)
    public ResponseEntity getConnectorWithNameTasks(@PathVariable String name, HttpServletRequest request) {
        LOG.info("Get Kafka Connect connector tasks for: {}", name);
        return restProxyForward(request);
    }

    /**
     * This method returns a status for the specified connector and its task id.
     * @param name
     * @param taskId
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/tasks/{taskId}/status", method = RequestMethod.GET)
    public ResponseEntity getConnectorWithName(@PathVariable String name, @PathVariable String taskId, HttpServletRequest request) {
        LOG.info("Get Kafka Connect connector '{}' task status for: {}", name, taskId);
        return restProxyForward(request);
    }

    /**
     * This method issues a Restart request to the specified connector for a task specified by its id.
     * @param name
     * @param taskId
     * @param body
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connectors/{name}/tasks/{taskId}/restart", method = RequestMethod.POST)
    public ResponseEntity postConnectorWithNameTaskRestart(@PathVariable String name, @PathVariable String taskId, @RequestBody String body, HttpServletRequest request) {
        LOG.info("Restart Kafka Connect connector '{}' task: {}", name, taskId);
        return restProxyForward(request);
    }

    /**
     * This method returns a list of plugins.
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connector-plugins", method = RequestMethod.GET)
    public ResponseEntity getConnectorPlugins(HttpServletRequest request) {
        LOG.info("Get Kafka Connect plugins");
        return restProxyForward(request);
    }

    /**
     * This method validates a plugin configuration.
     * @param name
     * @param body
     * @param request
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/connector-plugins/{name}/config/validate", method = RequestMethod.PUT)
    public ResponseEntity putConnectorPluginsWithNameValidate(@PathVariable String name, @RequestBody String body, HttpServletRequest request) {
        LOG.info("Validate Kafka Connect plugin");
        return restProxyForward(request, body);
    }

}
