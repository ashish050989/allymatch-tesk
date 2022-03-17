import React, { Fragment, useEffect, useState } from 'react'
import { isEmpty } from './Helper';
import { FaCheck, FaSortUp, FaSortDown } from 'react-icons/fa';
import { data } from './data';
import OutputComponent from './components/OutputComponent';

function App() {

  const [outputScreen, setOutputScreen] = useState(false);

  const [selectedData, setSelectedData] = useState('');

  useEffect(() => {

    setSelectedData(data);
    return () => {

    }
  }, [])


  const onChangeHandler = (index, item, subItemIndex = "") => {

    if (item === 'selected') {

      let newArr = [...selectedData]; // copying the old datas array
      newArr[index].selected = isEmpty(newArr[index].selected) ? !newArr[index].selected : true  // replace e.target.value with whatever you want to change it to
      setSelectedData(newArr);
    }
    if (item === 'subCattoggle') {
      let newArr = [...selectedData]; // copying the old datas array
      newArr[index].subCattoggle = isEmpty(newArr[index].subCattoggle) ? !newArr[index].subCattoggle : true  // replace e.target.value with whatever you want to change it to
      setSelectedData(newArr);
    }
  }

  const onChangeHandlerLevel2 = (subItem, subIndex, index) => {

    if (subItem === 'selected') {
      let newArr = [...selectedData]; // copying the old datas array
      newArr[index].subCategries[subIndex].selected = isEmpty(newArr[index].subCategries[subIndex].selected) ? !newArr[index].subCategries[subIndex].selected : true  // replace e.target.value with whatever you want to change it to
      setSelectedData(newArr);
    }

    if (subItem === 'subCattoggle') {
      let newArr = [...selectedData]; // copying the old datas array
      newArr[index].subCategries[subIndex].subCattoggle = isEmpty(newArr[index].subCategries[subIndex].subCattoggle) ? !newArr[index].subCategries[subIndex].subCattoggle : true  // replace e.target.value with whatever you want to change it to
      setSelectedData(newArr);
    }

  }

  const onChangeHandlerLevel3 = (subProductIndex, subIndex, index) => {

    let newArr = [...selectedData]; // copying the old datas array
    let select = newArr[index].subCategries[subIndex].subProduct[subProductIndex].selected;
    newArr[index].subCategries[subIndex].subProduct[subProductIndex].selected = isEmpty(select) ? !select : true  // replace e.target.value with whatever you want to change it to
    setSelectedData(newArr);


  }

  const getListLevel2 = (subItem, subIndex, index) => {

    if (!isEmpty(subItem.subProduct)) {
      return (
        <>
          {subItem.selected &&
            <Fragment key={index}>
              <li className="list-group-item" style={{ background: '#9ca2ac' }}
                onClick={() => onChangeHandlerLevel2('subCattoggle', subIndex, index)} >
                <div className='row'>
                  <div className='col-md-10'> Select Sub Product </div>
                  <div className='col-md-2'>{subItem.subCattoggle ? <FaSortUp /> : <FaSortDown />}</div>
                </div>
              </li>
              {subItem.subCattoggle && (
                <ul style={{ background: '#e4e6eb', listStyleType: 'none', padding: 0, textAlign: 'center', margin: 10 }}>
                  {subItem.subProduct.map((subProduct, subProductIndex) => (
                    <Fragment>
                      <li className=""
                        style={{
                          borderBottomStyle: 'solid',
                          paddingLeft: 10,
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottomColor: '#fff'
                        }}
                        onClick={() => onChangeHandlerLevel3(subProductIndex, subIndex, index)}
                      >

                        <div className='row'>
                          <div className='col-md-10'> {subProduct.lable}</div>
                          <div className='col-md-2'>{subProduct.selected && <FaCheck />}</div>
                        </div>
                      </li>
                    </Fragment>
                  ))}
                  <button type="button" className="btn btn-primary"> +Add Sub Product</button>
                </ul>

              )}
            </Fragment>
          }
        </>)
    }
  }

  const getListLevel1 = (item, index) => {

    if (!isEmpty(item.subCategries)) {
      return (
        <>
          {item.selected &&
            <Fragment key={index}>
              <li className="list-group-item" style={{ background: '#33435a', color: '#fff', textAlign: "center" }}
                onClick={() => onChangeHandler(index, 'subCattoggle')} >
                <div className='row'>
                  <div className='col-md-10'> Select Sub Categries   </div>
                  <div className='col-md-2'>{item.subCattoggle ? <FaSortUp /> : <FaSortDown />}</div>
                </div>
              </li>

              {item.subCattoggle && (
                <div style={{ background: '#33435a' }}>
                  <ul style={{ background: '#d0d2d6', listStyleType: 'none', padding: 0, textAlign: 'center', margin: 10 }}>
                    {item.subCategries.map((subItem, subIndex) => (
                      <Fragment>
                        <li className=""

                          onClick={() => onChangeHandlerLevel2('selected', subIndex, index)} style={{
                            borderBottomStyle: 'solid',
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderBottomColor: '#fff'
                          }} >
                          <div className='row'>
                            <div className='col-md-10'> {subItem.lable}</div>
                            <div className='col-md-2'>{subItem.selected && <FaCheck />}</div>
                          </div>
                        </li>
                        {getListLevel2(subItem, subIndex, index)}
                      </Fragment>
                    ))}

                    <button type="button" className="btn btn-primary"> +Add Sub Categries</button>
                  </ul>
                </div>
              )}
            </Fragment>
          }
        </>)
    }
  }
  return (
    <div className="App">
      <div className="container" style={{ marginTop: 30 }}>
        <div className="row">
          {outputScreen ? (
            <OutputComponent selectedData={selectedData} />
          ) : (
            <div className="col-sm-4">
              <div className='row'>
                <div className='col-md-6'>
                  <h2> Products</h2>
                </div>
                <div className='col-md-6'>
                  <button type="button" className="btn btn-primary" onClick={() => setOutputScreen(!outputScreen)}> Save Product </button>
                </div>
              </div>

              <ul className='list-group'>
                {selectedData &&
                  <>
                    {selectedData.map((item, index) => (
                      <Fragment key={index}>
                        <li className="list-group-item" key={index} onClick={() => onChangeHandler(index, 'selected')}>
                          <div className='row'>
                            <div className='col-md-10'> {item.lable}  </div>
                            <div className='col-md-2'>{item.selected && <FaCheck />}</div>
                          </div>
                        </li>
                        {getListLevel1(item, index)}
                      </Fragment>
                    ))}
                  </>}
              </ul>
            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default App;
