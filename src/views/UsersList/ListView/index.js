import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import UsersDetails from './EditUsersDetails';
import CreateUsers from './CreateUsersDetails';
import {UserQuery} from '../../../graphql/queries/user'
import {UserCreate, UserDelete, UserEdit} from '../../../graphql/mutations/user'
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import {
  Avatar,
  Box,
  Card,
  Container,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  CardHeader,
  TextField,
  Button
} from '@material-ui/core';
import { Trash2 as TrashIcon, Edit as EditIcon} from 'react-feather';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  icon:{
    margin:'0 10px',
    cursor:'pointer'
  }
}));




const UsersList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(UserQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(UserDelete,{
    
    refetchQueries: [
      { query: UserQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(UserEdit,{
    refetchQueries: [
      { query: UserQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(UserCreate,{
    refetchQueries: [
      { query: UserQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  

 
  if (error) return <p>Error :(</p>;
 
 
  const defineEdit = (obj) => {
   setEdit(obj)
  };
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage+1);
  };
  const deleteUser = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editUser = (values) => {
    values.accessLevel=parseInt(values.accessLevel)
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createUser = (values) => {
    values.accessLevel=parseInt(values.accessLevel)
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Usuários"
    >
      <Container maxWidth={false}>
      {edit==false && create==false?
      <>
        <Toolbar create={setCreate} />
        <Box mt={3}>
          {loading?'':
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Nome
                      </TableCell>
                      <TableCell>
                        Login
                      </TableCell>
                      <TableCell>
                        Nível de acesso 
                      </TableCell>
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateUsers.docs.slice(0, limit).map((user) => (
                      <TableRow
                        hover
                        key={user.id}
                      >
                        
                        <TableCell>
                          <Box
                            alignItems="center"
                            display="flex"
                          >
                          
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {user.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {user.login}
                        </TableCell>
                        <TableCell>
                          {user.accessLevel}
                        </TableCell>
                       
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Tem certeza que deseja deletar o usuário "'+user.name+'"'}
                            title="Deletar usuário"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteUser(user.id)}
                          >
                            Deletar
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(user)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateUsers.total}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page-1}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage={'Itens por página:'}
            />
          </Card>
          }
        </Box>
        </>
        :
        <>
        {edit!==false?<UsersDetails set={setEdit} edit={editUser} details={edit}/>:''}
        {create!==false?<CreateUsers set={setCreate} create={createUser} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (UsersList);

