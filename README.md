# central-tendency
This app gets data from firebase which is structured as followed:
```
[{
    "id": "a",
    "firstName": "Test",
    "lastName": "Name",
    "dob": "01-01-1991"
},{
   "id": "b",
   "firstName": "Test",
   "lastName": "Name",
    "dob": "01-01-1962"
},{
  ...
}]
```
Based on this data, this app calculate the age of each customer, then calculate the average, median, and mode values of the data.

## Repository structure
`/store`

This is where HTTP GET request is managed to get the customers data from Firebase.

`App.vue`

Main logic to calculate the central tendency is written here.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
