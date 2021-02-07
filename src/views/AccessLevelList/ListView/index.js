import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import AccessLevelDetails from './EditAccessLevelDetails';
import CreateAccessLevel from './CreateAccessLevelDetails';
import { useMutation,useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  CardHeader,
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

const AccessLevelDelete = gql`
  mutation AccessLevelDelete($id:ID!){
    deleteAccessLevel(
      id:$id
    )
  }
`;
const AccessLevelQuery = gql`
  query AccessLevelQuery($page:Int!, $limit:Int!){
    paginateAccessLevel(page:$page, limit:$limit) {
      docs{
        id
        role
      }
      total
    }
  }
`;
const AccessLevelEdit = gql`
  mutation BooksEdit($id:ID!, $role:String!){
    updateAccessLevel(
      id:$id
      role:$role
  ),{
    id
  }
  }
`;
const AccessLevelCreate = gql`
  mutation BooksCreate( $role:String!){
    createAccessLevel(
      role:$role
  ),{
    id
  }
  }
`;


const AccessLevelList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(AccessLevelQuery, {
    variables: { page:page, limit:limit },
  });

  const [mutationDelete] = useMutation(AccessLevelDelete,{
    refetchQueries: [
      { query: AccessLevelQuery,
        variables: { page:page, limit:limit }
      }
    ]
  });

  const [mutationEdit] = useMutation(AccessLevelEdit,{
    refetchQueries: [
      { query: AccessLevelQuery,
        variables: { page:page, limit:limit }
      }
    ]
  });  

  const [mutationCreate] = useMutation(AccessLevelCreate,{
    refetchQueries: [
      { query: AccessLevelQuery,
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
  const deleteAccessLevel = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editAccessLevel = (values) => {
    values.quantity=parseInt(values.quantity)
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createAccessLevel = (values) => {
    values.quantity=parseInt(values.quantity)
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Niveis de Acesso"
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
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateAccessLevel.docs.slice(0, limit).map((accessLevel) => (
                      <TableRow
                        hover
                        key={accessLevel.id}
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
                              {accessLevel.role}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Tem certeza que deseja deletar o nivel de acesso "'+accessLevel.role+'"'}
                            title="Deletar nivel de acesso"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteAccessLevel(accessLevel.id)}
                          >
                            Deletar
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(accessLevel)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateAccessLevel.total}
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
        {edit!==false?<AccessLevelDetails edit={editAccessLevel} details={edit}/>:''}
        {create!==false?<CreateAccessLevel create={createAccessLevel} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (AccessLevelList);

