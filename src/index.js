import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import 'jstree/dist/jstree.min';
import 'jstree/dist/themes/default/style.css';

class TreeView extends Component {

  static propTypes = {
    treeData: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedNode: PropTypes.string.isRequired,
    addCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { treeData, onSelect, addCategory, editCategory, deleteCategory } = this.props;
    let _selectedNodeId, count = 0;
    if (treeData) {
      $('#data').jstree(treeData)
        .bind('select_node.jstree', onSelect)
        .bind('create_node.jstree',(e, data)  => {
          data.instance.set_icon(data.node, 'fa fa-folder');
        })
        .bind('rename_node.jstree', (e, data) => {
          const { node } = data;
          if (node.id.includes('j')) {
            addCategory(node, { parent_id: parseInt(node.parent), name: node.text });
          } else {
            editCategory(node.id, { parent_id: parseInt(node.parent), name: node.text });
          }
        })
        .bind('open_node.jstree', (e, data) => {
          data.instance.set_icon(data.node, 'fa-folder-open');
        })
        .bind('close_node.jstree', (e, data) => {
          data.instance.set_icon(data.node, 'fa fa-folder');
        })
        .bind('delete_node.jstree', (e, data) => {
          const { node } = data
          deleteCategory(parseInt(node.id));
        });
    }
  }

  render() {
    return (
      <div id="data" />
    );
  }
}

export default TreeView;
