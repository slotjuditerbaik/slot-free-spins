'use babel';

import SlotFreeSpinsView from './slot-free-spins-view';
import { CompositeDisposable } from 'atom';

export default {

  slotFreeSpinsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotFreeSpinsView = new SlotFreeSpinsView(state.slotFreeSpinsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotFreeSpinsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-free-spins:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotFreeSpinsView.destroy();
  },

  serialize() {
    return {
      slotFreeSpinsViewState: this.slotFreeSpinsView.serialize()
    };
  },

  toggle() {
    console.log('SlotFreeSpins was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
