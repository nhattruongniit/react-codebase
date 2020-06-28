import Pusher from 'usonia-pusher-client';
import { toast } from 'react-toastify';
import request from './request';
import { addProjectItems } from '../modules/Projects/reducers/projects';
import { addDocumentItem } from '../modules/Projects/reducers/documents';

let pusher;
let channelName;

export async function initPusher(dispatch) {
  try {
    const res = await request('/pusher');
    const { APP_UID } = res.data.data;
    pusher = new Pusher({
      server: process.env.REACT_APP_PUSHER_API,
      app_key: process.env.REACT_APP_PUSHER_KEY
    });
    channelName = APP_UID;
    pusher.subscribe([channelName]);

    pusher.on('create-project', data => {
      const project = data.data;
      dispatch(addProjectItems([project]));
    });

    pusher.on('create-idf-document', data => {
      const document = data.data;
      dispatch(addDocumentItem(document));
    });

    pusher.on('update-project', data => {
      console.log('update project', data);
    });

    pusher.on('create-logs', data => {
      const {
        data: { message, type }
      } = data;
      const getToastType = {
        notice: 'success',
        error: 'error',
        success: 'success'
      };
      toast(message, {
        type: getToastType[type],
        autoClose: 6000
      });
    });
  } catch (e) {
    console.log('Pusher error', e);
    toast('Unable to subscribe to pusher', {
      type: 'error',
      autoClose: 6000
    });
  }
}

export function subscribeToDocumentChannel(documentId) {
  if (pusher && channelName) {
    const newChannelName = `${documentId}@${channelName}`;
    console.log('Subscribe to ' + newChannelName);
    pusher.subscribe([channelName, newChannelName]);
  }
}
