import Block from '../../block/Block';

import React, { useState } from 'react';

import CustomTable from '../../tables/Customtable';


const GreenWindow = ({ datas,headers}) => {
    const [data, setData] = useState(datas);
    const [header, setheader] = useState(headers);

  

  
    return (
      <Block >
        { data ? (
          {
            title: "GreenWindow",
            content: (
              <CustomTable
              
                headers={header}
                
                data={data}
                
              />
            ),
          }
        ) : (
          <div>Loading...</div>
        )}
      </Block>
    );
  };
  


export default GreenWindow;