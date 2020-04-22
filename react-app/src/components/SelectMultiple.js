import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  { id: "a", name: "Oliver Hansen" },
  { id: "b", name: "Van Henry" },
  { id: "c", name: "April Tucker" },
  { id: "d", name: "Ralph Hubbard" },
  { id: "e", name: "Omar Alexander" },
  { id: "f", name: "Carlos Abbott" },
  { id: "g", name: "Miriam Wagner" },
  { id: "h", name: "Bradley Wilkerson" },
  { id: "i", name: "Virginia Andrews" },
  { id: "j", name: "Kelly Snyder" }
];

/*function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
}*/

class MultipleSelect extends React.Component {
  state = {
    name: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      name: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
    
        <FormControl
          className={classNames(classes.formControl, classes.noLabel)}
        >
          <Select
            multiple
            displayEmpty
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-placeholder" />}
            renderValue={
              this.state.name.length > 0
                ? undefined
                : () => <em>Placeholder</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem>
            {names.map(name => (
              <MenuItem
                key={name.id}
                value={name.id}
                // style={getStyles(name, this)}
              >
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
