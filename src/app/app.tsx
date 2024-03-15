import {
    AppRoot,
    SplitLayout,
    SplitCol,
    View,
    PanelHeader,
    usePlatform,
  } from '@vkontakte/vkui';
  import '@vkontakte/vkui/dist/vkui.css';

import { useMemo, useState } from 'react'
import { PanelContext } from './providers/PanelContext';

import MainPanel from '../entities/main-panel/UI';
import FactsPanel from '../entities/facts-panel/UI';
import AgePanel from '../entities/age-panel/UI';

  function App() {
    const platform = usePlatform();
    const [activePanel, setActivePanel] = useState('mainPanel');
    const currentPanel = useMemo(() => ({ activePanel, setActivePanel }), [activePanel]);

    return (
      <PanelContext.Provider value={{ currentPanel }}>
      <AppRoot>
        <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
          <SplitCol autoSpaced>
            <View activePanel={activePanel}>
              <MainPanel id="mainPanel" />
              <FactsPanel id="factsPanel" />
              <AgePanel id="agePanel" />
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
      </PanelContext.Provider>
    );
  }

  export default App
