import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './page6.css';

export class SoilClass2018 extends Component {
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
      
        <div className="Page6">
        <InputLabel style={{marginBottom: '32px', fontSize:'25px'  }}>Zemin cinsini seçiniz</InputLabel>
        {/*
        <Select
          onChange={handleChange('soilClass')}
          defaultValue={values.soilClass}
          fullWidth
        >
          
          <MenuItem value={0}>Bilmiyorum</MenuItem>
          <MenuItem value={1}>I</MenuItem>
          <MenuItem value={2}>II</MenuItem>
          <MenuItem value={3}>III</MenuItem>
          <MenuItem value={4}>IV</MenuItem>
          
        </Select>
        */}
        <Select
          onChange={handleChange('soilClass')}
          defaultValue={values.soilClass}
          fullWidth
        >
          
          <MenuItem value={'ZC'}>Bilmiyorum</MenuItem>
          <MenuItem value={'ZA'}>ZA</MenuItem>
          <MenuItem value={'ZB'}>ZB</MenuItem>
          <MenuItem value={'ZC'}>ZC</MenuItem>
          <MenuItem value={'ZD'}>ZD</MenuItem>
          <MenuItem value={'ZE'}>ZD</MenuItem>
          
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

export default SoilClass2018;
