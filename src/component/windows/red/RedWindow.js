import Block from '../../block/Block';

import React, { useState } from 'react';

import CustomTable from '../../tables/Customtable';


const RedWindow = () => {
    const [data, setData] = useState([{"A":1,"B":1},{"A":2,"B":4}]);


  

  
    return (
      <Block >
        { data ? (
          {
            title: "RedWindow",
            content: (
              <CustomTable
              
                headers={["A","B"]}
                
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
  


export default RedWindow;