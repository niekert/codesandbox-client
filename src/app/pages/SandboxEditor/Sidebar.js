// @flow
import React from 'react';
import styled from 'styled-components';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import ModuleList from './ModuleList';

import moduleEntity from '../../store/entities/modules/';
import type { Module } from '../../store/entities/modules';
import type { Sandbox } from '../../store/entities/sandboxes/';

const Container = styled.div`
  position: relative;
  background-color: ${props => props.theme.background};
  width: 20rem;
`;

const Title = styled.h2`
  padding: 1rem;
  margin: 0 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: white;
  font-weight: 300;

  border-bottom: 1px solid ${props => props.theme.background.lighten(0.5)};
`;

const DraggableModuleList = DragDropContext(HTML5Backend)(ModuleList);

type Props = {
  modules: Array<Module>;
  activeModuleId: string;
  url: (module: Module) => string;
  sandbox: ?Sandbox;
  renameModule: typeof moduleEntity.actions.editModule;
  createModule: typeof moduleEntity.actions.createModule;
  toggleTreeOpen: typeof moduleEntity.actions.toggleTreeOpen;
}
export default ({
  sandbox,
  modules,
  renameModule,
  createModule,
  toggleTreeOpen,
  activeModuleId,
  url,
}: Props) => (
  <Container>
    <Title>{sandbox ? sandbox.title : 'Loading...'}</Title>
    {sandbox &&
      <DraggableModuleList
        module={modules.find(x => x.mainModule)}
        modules={modules}
        activeModuleId={activeModuleId}
        createModule={createModule}
        renameModule={renameModule}
        toggleTreeOpen={toggleTreeOpen}
        url={url}
        depth={0}
      />}
  </Container>
);