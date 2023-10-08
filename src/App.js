import './App.css';
import DESEncryption from './components/DESEncryption';
import { useState } from 'react';
import { ConfigProvider, theme, Switch, Layout } from 'antd';
import { Content, Header, Footer } from 'antd/es/layout/layout';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      components: {
        Layout: {
          headerColor: 'rgba(255, 255, 255, 0.85)',
        },
      },
    }}>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          DES Encryption & Decryption Tool
        </Header>
        <div className="App">
          <Content>
            <Switch checked={isDarkMode} onChange={handleSwitchChange} />
            <DESEncryption />
          </Content>
        </div>
        <Footer style={{ textAlign: 'center' }}>Produced by Wu Tianyu</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
