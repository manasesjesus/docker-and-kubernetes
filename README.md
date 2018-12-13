# Docker and Kubernetes: The Complete Guide

Build, test and deploy Docker applications with Kubernetes while learning production-style development workflows.
<BR><BR>
This repository contains the exercises from the course with my additions/modifications/notes. <BR>
Course available at https://www.udemy.com/docker-and-kubernetes-the-complete-guide

### redis-image
Use an existing user image as a base, download and install a dependency and tell the image what to do when it starts as a container

### webapp
A simple hello world application in node.js/express.
Using docker to specify a base image and working directory, copy/install dependencies and run a default command.

### visits-counter
A node.js application that counts the number of page visits. It uses two containers, one for the node.js server and one for redis to store the value.

Docker compose creates the two containers (redis, node); both have free access to each other and can exchange as much information as they need.

