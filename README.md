[![Coverage Status](https://coveralls.io/repos/github/jm-wanja/document_management_system/badge.svg?branch=feature%2F%23146368967%2Ffrontend-structure)](https://coveralls.io/github/jm-wanja/document_management_system?branch=feature%2F%23146368967%2Ffrontend-structure)

[![Build Status](https://travis-ci.org/jm-wanja/document_management_system.svg?branch=feature%2F%23146368967%2Ffrontend-structure)](https://travis-ci.org/jm-wanja/document_management_system)
# Project Title

Shelf is a document management system. That allows users to create documents and save documents.Each User has a role while documents have users and access. The Administrator can view all documents, however users can only view their own documents and public ones. The default permission for documents is public. To make a document private toggle the button at the bottom of the form. 

### Prerequisites

First ensure that you have [Node.js](https://nodejs.org/en/) and [Postgresql](https://www.postgresql.org/) installed.  

### Installing

* Clone this [repository](https://github.com/jm-wanja/document_management_system.git)
* Install the necessary packages by running the following command: `npm install`

## Models

Three models are defined: `Roles`, `Users` and `Documents`. `Roles` must have a unique title on their creation. A `User` must have a `Role` defined for them. The routes are defined under `server/models`.

## Testing

Testing is achieved through use of `enzyme`, `mocha` and `chai` packages. `enzyme` is used to simulate react events while testing. `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm install` and the tests will run with the command `npm test`.

## Routes

The routes are defined using `react-router`.

## Deployment

Find this app on [heroku](https://shelfdms.herokuapp.com/)

## Built With

* Node
* Express
* Sequelize
* React
* Redux

## Agile

This project was managed using [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2036865)


## Authors

* **Julie Wanja** [Shelf](https://github.com/jm-wanja/document_management_system)

