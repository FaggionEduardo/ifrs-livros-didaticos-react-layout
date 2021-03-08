import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {}
}));

const UserDetails = ({ className, create, set,...rest }) => {
  const classes = useStyles();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);
  

  

  return (
    <form
      onSubmit={handleSubmit(create)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de um usuário."
          title="Usuário"
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
                error={!!errors.name}
                fullWidth
                helperText={!!errors.name?errors.name:"Informe o nome do usuário"}
                label={input.name.label}
                name="name"
                type={input.name.type}
                onChange={({ target }) => handleChange(target)}
                value={input.name.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={!!errors.login}
                fullWidth
                helperText={errors.login}
                label={input.login.label}
                name="login"
                type={input.login.type}
                onChange={({ target }) => handleChange(target)}
                value={input.login.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
               <TextField
                error={!!errors.password}
                fullWidth
                helperText={errors.password}
                label={input.password.label}
                name="password"
                type={input.password.type}
                onChange={({ target }) => handleChange(target)}
                value={input.password.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
             <TextField
                error={!!errors.accessLevel}
                fullWidth
                helperText={errors.accessLevel}
                label={input.accessLevel.label}
                name="accessLevel"
                type={input.accessLevel.type}
                onChange={({ target }) => handleChange(target)}
                value={input.accessLevel.value}
                variant="outlined"
              />
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



export default UserDetails;
