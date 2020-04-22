import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCategory";
import { Grid,TextField, Paper, TableContainer, Table,TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import AddCategory from "./AddCategory";
import TextInput from "./FormSearch";
import Icon from '@material-ui/core/Icon';
import { Divider } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { grey } from "@material-ui/core/colors";



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
    }
})

const DCandidates = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [search, setSearch] = useState("");
    const [filteredCategory, setFilteredCategory] = useState([]);   

    useEffect(() => {
        props.fetchAllDCandidates()

        setFilteredCategory(
            props.dCategoryList.filter(country =>
              country.name.toLowerCase().includes(search.toLowerCase())
            )
          );
    }, [search, props.dCategoryList])
    
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={12}>
                    <AddCategory {...({ currentId, setCurrentId })} />
                </Grid>          
                {/* <TextInput name={'Search'} lable={'Search Category'} data={filteredCategory}/>     */}
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>IsActive</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell className={classes.formControl}> 
                                    <TextField
                                        name="name"
                                        label="Search Category"
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredCategory.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.isActive === 1 ? <span className='text-success'>Active</span> :<span  className='text-danger'>In Active</span> }</TableCell>
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
    dCategoryList: state.dCategory.list
})

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));