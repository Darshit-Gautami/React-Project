import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dProduct";
import { Grid, Paper, TextField,TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import AddProduct from "./AddProduct";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
})

const DUser = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [search, setSearch] = useState("");
    const [filteredProduct, setFilteredProduct] = useState([]);  
    useEffect(() => {
        props.fetchAllDProduct()

        setFilteredProduct(
            props.dProductList.filter(data =>{
                return(
                    data.name.toLowerCase().includes(search.toLowerCase()) ||
                    data.category.toLowerCase().includes(search.toLowerCase())
                )
            })
          );
    }, [search, props.dProductList])
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDProduct(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <AddProduct {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>
                                    <TextField
                                        className={classes.formControl}
                                        name="name"
                                        label="Search Product | Category"
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredProduct.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.category}</TableCell>
                                            <TableCell>{record.cost}</TableCell>
                                            <TableCell>{record.description}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dProductList: state.dProduct.list
})

const mapActionToProps = {
    fetchAllDProduct: actions.fetchAll,
    deleteDProduct: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DUser));