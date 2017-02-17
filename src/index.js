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
    editCategory: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { treeData, onSelect, addCategory, editCategory } = this.props;
    let _selectedNodeId, count = 0;
    if (treeData) {
      $('#data').jstree(treeData)
        .bind('select_node.jstree', onSelect)
        .bind('create_node.jstree', function(e, data) {
          data.instance.set_icon(data.node, 'fa fa-folder');
        })
        .bind('rename_node.jstree', function (e, obj) {
          const { node } = obj;
          if (node.id.includes('j')) {
            addCategory(node, { parent_id: parseInt(node.parent), name: node.text })
          } else {
            editCategory(node.id, { parent_id: parseInt(node.parent), name: node.text })
          }
        })
        .bind('open_node.jstree', function (e, data) {
          data.instance.set_icon(data.node, 'fa-folder-open');
        })
        .bind('close_node.jstree', function (e, data) {
          data.instance.set_icon(data.node, 'fa fa-folder');
        });
    }
  }


  addNode = () => {
    // console.log('add')
    // console.log(this.props.selectedNode)
    // let node = $('#data').jstree().create_node(this.props.selectedNode, 'New Category');

    // $('#data').jstree().edit(node, undefined, (nodeReceived, status, cancelled) => {
    //   console.log(node)
    //   console.log(nodeReceived)
    //   console.log(status)
    //   if(status) {
    //     this.props.addCategory({ parent_id: parseInt(node.parent), name: node.text })
    //   }
    // });
  }

  editNode = () => {
    console.log('edit')
    let nodeToEdit = $('#data').jstree().get_selected();
    $('#data').jstree().edit(nodeToEdit);
  }

  render() {
    return (
      <div>
        <div id="data" />
        <footer className='button-row middle'>
          <div className='button green' onClick={this.addNode}>
            Add Category
          </div>
          <div className='button blue' onClick={this.editNode}>
            Edit Category
          </div>
        </footer>
      </div>
    );
  }
}

export default TreeView;
