import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as geomeryApi from '../services/geomeryApi';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ModelEditor = ({ match }) => {
  const { REACT_APP_MODEL_EDITOR_URL } = process.env;
  const iframeRef = useRef();
  const {documentId} = match.params;

  useEffect(() => {
    if (iframeRef.current) {
      setTimeout(() => {
        initEditor();
      }, 1000);
    }
  }, [iframeRef]);

  async function initEditor() {
    sendMessage({
      type: 'switch_theme',
      theme: 'light'
    });
    try {
      const res = await geomeryApi.fetchGeometries(match.params.documentId);
      sendMessage({
        type: 'geometry_created',
        objects: res.data.data,
      });
    } catch (e) {
      console.log(e);
    }

    handleIncomingMessage();
  }

  function sendMessage(message) {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  }

  function handleIncomingMessage(messageType, callback) {
    window.addEventListener('message', payload => {
      switch (payload.data.type) {
        case 'geometry_created': {
          handleGeometryCreated(payload.data);
          break;
        }

        case 'vertex_changed': {
          handleVertexChanged(payload.data);
          break;
        }

        case 'deleted': {
          handleGeometryDeleted(payload.data);
          break;
        }
      }
    });
  }

  async function handleGeometryCreated(data) {
    try {
      const response = await geomeryApi.createGeometries(documentId, data.objects);
      const switchIdsMap = response.data.data.map((dataItem, index) => [
        dataItem.id, [data.objects[index].id, data.objects[index].name]
      ]);
      sendMessage({
        type: 'replace_ids_and_names',
        map: switchIdsMap,
      });
      sendMessage({ type: 'take_snapshot' });
    } catch (e) {
      console.log(e);
      return sendMessage({
        type: 'deleted',
        ids: _.map(data.objects, 'id'),
      });
    }
  }

  async function handleGeometryDeleted(data) {
    await geomeryApi.deleteGeometries(documentId, data.ids);
  }

  async function handleVertexChanged(data) {
    await geomeryApi.updateGeometries(documentId, data);
  }


  return (
    <Container>
      <iframe sandbox="allow-scripts allow-same-origin" ref={iframeRef} src={REACT_APP_MODEL_EDITOR_URL} width="100%" height="100%" />
    </Container>
  );
}

export default withRouter(ModelEditor);