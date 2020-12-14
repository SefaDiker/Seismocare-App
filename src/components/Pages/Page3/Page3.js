import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import './page3.css';

export class Page3 extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      
        <div className="Page3">
           
          

        <InputLabel style={{fontSize:'25px'  }}>Binanızın Kat Sayısı</InputLabel>
        <Select style={{marginBottom:'9px' }}
          placeholder="Binanızın yapım yılını giriniz"
          onChange={handleChange('numberOfStory')}
          defaultValue={values.numberOfStory}
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>Kat sayısı</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          
        </Select>
           
            
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>
           
            <Button
              color="primary"
              variant="contained"             
              onClick={this.continue}
            >Continue</Button>

            



        </div>

        
      
    );
  }
}

export default Page3;
