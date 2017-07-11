import React from 'react';
import ReactQuill from "react-quill";

/*
var modules = {
  toolbar: [
    [{ size: [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }, 'direction' ],
    [ 'bold', 'italic', 'underline', 'strike' ],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    ['blockquote', 'code-block' ],
    [{ list: 'ordered' }, { list: 'bullet'}, { indent: '-1' }, { indent: '+1' }],
    [ 'link', 'image', 'video' ],
    [ 'clean' ]
  ],
};

///////Kada se edituje !!! psotaviti pocetni string(html) da ucitava
export default class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.text){
        this.state = { text: this.props.text }
    } 
    else{
        this.state = { text: '' }
    }
    
  }

  handleChange(value) {
    this.setState({ text: value })

    this.props.passedChange(value);
  }

  render() {
    return (
      <ReactQuill 
                  value={this.state.text}
                  className='editor'
                  onChange={this.handleChange.bind(this)}
                  modules={modules}
                  />
    )
  }
}
*/


/* global React */
/* global ReactQuill */
'use strict';

var Editor = React.createClass({

	getInitialState: function() {
		return {
			theme: 'snow',
			enabled: true,
			readOnly: false,
			value: '',
			events: []
		};
	},

	formatRange: function(range) {
		return range
			? [range.index, range.index + range.length].join(',')
			: 'none';
	},

	onTextareaChange: function(event) {
		var value = event.target.value;
		this.setState({ value:value });
	},

	onEditorChange: function(value, delta, source) {
		this.setState({
			value: value,
			events: [
				'text-change('+this.state.value+' -> '+value+')'
			].concat(this.state.events)
		});
	},

	onEditorChangeSelection: function(range, source) {
		this.setState({
			selection: range,
			events: [
				'selection-change('+
					this.formatRange(this.state.selection)
				+' -> '+
					this.formatRange(range)
				+')'
			].concat(this.state.events)
		});
	},

	onToggle: function() {
		this.setState({ enabled: !this.state.enabled });
	},

	onToggleReadOnly: function() {
		this.setState({ readOnly: !this.state.readOnly });
	},

	render: function() {
		return (
			React.DOM.div({},
				this.renderToolbar(),
				React.DOM.hr(),
				this.renderSidebar(),
				this.state.enabled && ReactQuill({
					theme: this.state.theme,
					value: this.state.value,
					readOnly: this.state.readOnly,
					onChange: this.onEditorChange,
					onChangeSelection: this.onEditorChangeSelection
				})
			)
		);
	},

	renderToolbar: function() {
		var state = this.state;
		var enabled = state.enabled;
		var readOnly = state.readOnly;
		var selection = this.formatRange(state.selection);
		return (
			React.DOM.div({},
				React.DOM.button({
					onClick: this.onToggle },
					enabled? 'Disable' : 'Enable'
				),
				React.DOM.button({
					onClick: this.onToggleReadOnly },
					'Set ' + (readOnly? 'read/Write' : 'read-only')
				),
				React.DOM.button({
					disabled: true },
					'Selection: ('+selection+')'
				)
			)
		);
	},

	renderSidebar: function() {
		return (
			React.DOM.div({
				style: { overflow:'hidden', float:'right' }},
				React.DOM.textarea({
					style: { display:'block', width:300, height:300 },
					value: this.state.value,
					onChange: this.onTextareaChange
				}),
				React.DOM.textarea({
					style: { display:'block', width:300, height:300 },
					value: this.state.events.join('\n')
				})
			)
		);
	}

});

QuillEditor = React.createFactory(Editor);
ReactQuill = React.createFactory(ReactQuill);

export default QuillEditor;

