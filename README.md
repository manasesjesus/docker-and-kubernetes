# Docker and Kubernetes: The Complete Guide

Build, test and deploy Docker applications with Kubernetes while learning production-style development workflows.

This repository contains the exercises from the course with my additions/modifications/notes.
Course available at https://www.udemy.com/docker-and-kubernetes-the-complete-guide

## fib-calc
A multicontainer and "complicated" version of a Fibonacci calculator. It runs on a Nginx server, uses React for the frontend and Express for the backend API. All calculated values get stored in a Postgres database and it uses Redis for the logs. A worker process watches Redis for new indexes and calculates the Fibonacci value.

## react-app
A bootstrapped React application running on a container.
Multi-step Docker process to have a build phase and a run phase.
It uses Nginx to serve the application.

## redis-image
Use an existing user image as a base, download and install a dependency and tell the image what to do when it starts as a container.

## visits-counter
A Node.js application that counts the number of page visits. It uses two containers, one for the Node.js server and one for Redis to store the value.

Docker compose creates the two containers (redis, node); both have free access to each other and can exchange as much information as they need.

## webapp
A simple "Hello world" application in using Node.js and Express.
Using Docker to specify a base image and working directory, copy/install dependencies and run a default command.
