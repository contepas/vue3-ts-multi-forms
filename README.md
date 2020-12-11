# Vue3 and Typescript Multi Forms

## Technologies

* Vue 3 (composition API - options API)
* Typescript
* Vuex
* Vue Router
* Lodash
* Scss

## Notes

The application in wrote in Vue 3. The coposition API is used as well the options API.
Typescript is used in most of the components and only to add a static types.

## Code structure

The form releated data (actions, mutations, getter, validations) are managed in the store, 
a separated store for every form, this makes easier to check the validation of the form data outside of the component,
giving to the developers the possibility to trigger form actions or react at data changes outside of the component scope
(example: will be easier to trigger an action that will check the data of all the forms and submit them all togheter).

There are two different store implamantation, one is in vuex and another one in wrote with the Reactivity APIs of vue 3.




## Mocke rest API calls

All the rest API calls are mocked in the restApi service in src/services.
This service has is own validation rules and simulate server call delay and responses.
The server can be turned off, this deabiliate every post, put or delete call.


### Demo
Check the demo [here](https://festive-mayer-3ae445.netlify.app).
