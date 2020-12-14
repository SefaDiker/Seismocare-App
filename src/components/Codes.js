class Codes {

    seismicZone = () => {
        var seismicZone=0;
        const { values: {location}} = this.props;
        if (location == 'istanbul'){
          
            seismicZone=2
          
        }if (location == 'ankara'){
          
            seismicZone=3
          
        } 
      }

      analize = () => {
          this.seismicZone();
          return 'hh'
      }


}
export default Codes;