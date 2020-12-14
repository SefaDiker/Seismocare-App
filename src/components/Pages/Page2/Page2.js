import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import './page2.css';

export class Page2 extends Component {
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
      
        <div className="Page2">
          <InputLabel style={{ fontSize:'25px'  }}>Binanızın Yapım Yılı</InputLabel>
            <TextField
              placeholder="Binanızın yapım yılını giriniz"
              label="Binanızın Yapım Yılı"
              onChange={handleChange('constructionYear')}
              defaultValue={values.constructionYear}
              margin="normal"
              fullWidth
            />
            
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

export default Page2;