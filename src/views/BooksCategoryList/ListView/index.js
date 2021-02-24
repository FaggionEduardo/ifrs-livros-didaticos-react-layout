import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import CategoryDetails from './EditCategoryDetails';
import CreateCategory from './CreateCategoryDetails';
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

const CategoryDelete = gql`
  mutation CategoryDelete($id:ID!){
    deleteCategory(
      id:$id
    )
  }
`;
const CategoryQuery = gql`
  query CategoryQuery($page:Int!, $limit:Int!){
    paginateCategories(page:$page, limit:$limit) {
      docs{
        id
        name
      }
      total
    }
  }
`;
const CategoryEdit = gql`
  mutation CategoryEdit($id:ID!, $name:String!){
    updateCategory(
    id:$id
    name:$name
  ),{
    id
   
  }
  }
`;
const CategoryCreate = gql`
  mutation CategoryCreate( $name:String!){
    createCategory(
    name:$name
  ),{
    id
   
  }
  }
`;


const CategoryList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(CategoryQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(CategoryDelete,{
    
    refetchQueries: [
      { query: CategoryQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(CategoryEdit,{
    refetchQueries: [
      { query: CategoryQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });  
  const [mutationCreate] = useMutation(CategoryCreate,{
    refetchQueries: [
      { query: CategoryQuery,
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
  const deleteBook = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editBook = (values) => {
    values.quantity=parseInt(values.quantity)
    mutationEdit({ variables: values })
    setEdit(false)
  };
  const createBook = (values) => {
    values.quantity=parseInt(values.quantity)
    mutationCreate({ variables: values })
    setCreate(false)
  };
 
  return (
    <Page
      className={classes.root}
      title="Categorias de Livros"
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
                        Categoria
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateCategories.docs.slice(0, limit).map((book) => (
                      <TableRow
                        hover
                        key={book.id}
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
                              {book.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Tem certeza que deseja deletar a categoria "'+book.name+'"'}
                            title="Deletar categoria"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteBook(book.id)}
                          >
                            Deletar
                          </Button>
                          </Modal>
                          
                          <EditIcon onClick={()=>defineEdit(book)} className={classes.icon}/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateCategories.total}
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
        {edit!==false?<CategoryDetails set={setEdit} edit={editBook} details={edit}/>:''}
        {create!==false?<CreateCategory set={setCreate} create={createBook} />:''}
        </>
        }
      </Container>
    </Page>
  );
};

export default (CategoryList);

