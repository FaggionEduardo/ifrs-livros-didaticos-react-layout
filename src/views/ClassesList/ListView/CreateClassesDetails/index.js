import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery, gql } from '@apollo/client';
import { CoursesQuery } from '../../../../graphql/queries/class'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles, 
  Select,
  InputLabel
} from '@material-ui/core';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ClassDetails = ({ className, create, set,...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState(
    {
      name: "",
      course_id: 1
    }
  );

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const { loading, error, data } = useQuery(CoursesQuery);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <form
      onSubmit={()=>{create(values)}}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de uma turma."
          title="Turma"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Informe o nome da turma"
                label="Turma"
                name="name"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Curso</InputLabel>
                <Select
                  id="select"
                  onChange={handleChange}
                  label="Curso"
                  name="course_id"
                  required
                >
                  {data.courses.map((course) => (
                    <MenuItem value={course.id}>{course.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            style={{marginRight:10,backgroundColor:"#8B0000",color:'#fff'}}
            variant="contained"
            onClick={()=>set(false)}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Cadastrar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ClassDetails;
