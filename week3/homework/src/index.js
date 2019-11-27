'use strict';
const express = require('express');

const app = express();
const port = 5000;

app.use();

app.get('/', (req, res) => {
  Todo.all((err, todos) =>
    res.format({
      json: () => {
        res.status(200).json(todos);
      },
      html: () => {
        res.status(406).send('Not supported yet\n');
      },
    }),
  );
});

app.post('/', (req, res) => {
  console.log(req.body);
  var newTodo = JSON.parse(req.body);
  Todo.add(newTodo);
  res.status(201).json();
});

app.put('/:id', (req, res) => {
  var id = req.params.id;
  var updatedTodo = JSON.parse(req.body);
  updatedTodo.id = parseInt(id);
  Todo.update(updatedTodo, (err, data) => {
    if (err) {
      res.status(404, 'The task is not found').send();
    } else {
      res.status(204).send(data);
    }
  });
});

app.delete('/:id', (req, res) => {
  var id = parseInt(req.params.id);
  Todo.delete(id, err => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  });
});

app.listen(port);
