import './App.css';
import DESEncryption from './components/DESEncryption';
import RSA from './components/RSA';
import DES from './components/DES';
import { useState } from 'react';
import { ConfigProvider, theme, Switch, Layout, Typography } from 'antd';
import { Content, Header, Footer } from 'antd/es/layout/layout';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const Text = Typography.Text;

  const handleSwitchChange = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: '#722ed1',
        colorInfo: '#13c2c2',
      },
      components: {
        Layout: {
          headerColor: 'rgba(255, 255, 255, 0.85)',
        },
      },
    }}>
      <Layout className="layout-container">
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          DES Encryption & Decryption Tool
        </Header>
        <div className="App">
          <Content>
            <div className='switch-container'>
              <Text style={{ marginRight: 10 }}>Dark Mode 🌒</Text>
              <Switch checked={isDarkMode} onChange={handleSwitchChange} />
            </div>

            <div className='des-encryption-container'>
              <DESEncryption />
              {/* <RSA /> */}
              {/* <DES /> */}
            </div>
          </Content>
        </div>
        <Footer style={{ textAlign: 'center' }}>Produced by Wu Tianyu</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
