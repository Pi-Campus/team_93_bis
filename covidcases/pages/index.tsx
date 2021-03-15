import React, { useEffect, useState } from 'react';
import FlexView from 'react-flexview';
import { Table, Input, Button } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import axios from 'axios';
const { Header, Content, Footer } = Layout;

require('antd/dist/antd.less');

const data = require('./data1.json');

function List(props: any = {}): any {
  const [myData, setMyData] = useState<any>(null);
  const [value, setValue] = useState<any>('');

  const submit = async (val: any) => {
    const { data } = await axios.post(
      'https://api.askdata.com/smartinsight/data/nl/result',
      {
        nl: val,
        language: 'en',
      },
      {
        headers: {
          Authorization: 'Bearer 80a63398-c08c-4fa1-b170-4332ada204db',
        },
      },
    );
    setMyData(data);
  };

  const columns = myData?.schema.map((s: any) => {
    return {
      name: s.name,
    };
  });

  const dataSource = myData?.data.map((cell: any, i: any) => {
    const obj: any = {};

    cell.cells.forEach((c: any, ii: any) => {
      obj[columns[ii].name] = c.value;
    });

    return obj;
  });

  const columnComp = columns?.map((col: any) => {
    return <Table.Column title={col.name} dataIndex={col.name} />;
  });
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <h1>{data.dataset.name}</h1>

        <Input
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            submit(value);
          }}
        >
          Submit
        </Button>

        {!!myData && <Table dataSource={dataSource}>{columnComp}</Table>}
      </Content>
    </Layout>
  );
}

export default List;
