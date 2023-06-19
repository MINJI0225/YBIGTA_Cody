## API Documentation

This part explains all endpoints of our API. 

## Endpoints

#### `/api/saveData` 

Accepts POST requests. 

Request body should include:
- `gender`: a string representing the user's gender
- `sensitivity1`: a numerical value representing the user's first sensitivity
- `sensitivity2`: a numerical value representing the user's second sensitivity
- `style`: a string representing the user's style

Example request body:
```json
{
  "gender": "female",
  "sensitivity1": 0.5,
  "sensitivity2": 0.8,
  "style": "casual"
}
```


Response will be a JSON object with a single key `result`.

Example response:

```json
{
  "result": "Success!"
}
```
