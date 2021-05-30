import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import path from 'path';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import debounce from 'lodash.debounce';

import { listFiles } from '../files';

// Used below, these need to be registered
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreviewer from '../components/MarkdownEditor/previewer';
import PlaintextEditor from '../components/PlaintextEditor';
import SwitchButton from '../components/SwitchButton';

import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

import css from './style.module.css';

const TYPE_TO_ICON = {
  'text/plain': IconPlaintextSVG,
  'text/markdown': IconMarkdownSVG,
  'text/javascript': IconJavaScriptSVG,
  'application/json': IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile }) {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ''
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func
};

function DefaultPreviewer({ value }) {
  return (
      <div className={css.content}>{value}</div>
  );
}

DefaultPreviewer.propTypes = {
  value: PropTypes.string
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
  "text/markdown": MarkdownEditor,
};

const REGISTERED_PREVIEWERS = {
  "text/markdown": MarkdownPreviewer
}

function SavedIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </SvgIcon>
  );
}

function BackArrowIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z"/>
    </SvgIcon>
  );
}

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [activeFileValue, setActiveFileValue] = useState(null);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  useEffect(() => {
    (async () => {
      if (activeFile != null) {
        setActiveFileValue(await activeFile.text());
      }
    })();
  }, [activeFile]);

  const write = (value, file, allFiles) => {
    (async () => {
      setSaving(true);
      // Timeout is just for emulation of API mutation
      setTimeout(() => {
        const newFile = new File([value], file.name, {
          type: file.type
        });
        const newFiles = allFiles.map(f => f.name === newFile.name ? newFile : f);
        setFiles(newFiles);
        setSaving(false);
      }, 1000)
    })();
  };

  const SAVE_DELAY_MS = 1000;

  const debouncedSave = React.useCallback(
    debounce(async (newValue, file, allFiles) => {
      write(newValue, file, allFiles);
    }, SAVE_DELAY_MS, {
      leading: true
    }),
    [],
  );
  
  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;
  const Previewer = activeFile ? REGISTERED_PREVIEWERS[activeFile.type] ?? DefaultPreviewer : null;
  
  const renderFileView = () => (<>
    {activeFile && (
      <div className={css.editor}>
        <div className={css.title}>
          <Box display="flex">
            <div>
              {path.basename(activeFile.name)}
            </div>
            <Box display="flex" alignItems={'center'} ml={1}>
              {saving ? <CircularProgress size={15} /> : (
                <SavedIcon fontSize="small" />
              )}
            </Box>
          </Box>
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span
              style={{
                marginRight: '10px',
                marginLeft: '10px'
              }}
            >
              Preview
            </span>
            <SwitchButton
              checked={preview}
              onChange={(e) => {
                setPreview(e.target.checked)
              }}
            />
          </div>
        </div>

        {Editor && (
          <>
            {preview ?
              (
                <div className={css.previewerWrapper}>
                  <Previewer value={activeFileValue} />
                </div>
              )
              : (<>
                  <Editor 
                    value={activeFileValue}
                    onChange={(value) => {
                      setActiveFileValue(value);
                      debouncedSave(value, activeFile, files);
                    }}
                  />
                </>)
            }
          </>
        )}
        {!Editor && <div className={css.previewerWrapper}><Previewer value={activeFileValue} /></div>}
      </div>
    )}

    {!activeFile && (
      <div className={css.empty}>Select a file to view or edit</div>
    )}
  </>);

  return (
    <div className={css.page}>
      <Head>
        <title>Corsali Engineering Challenge</title>
      </Head>
      <aside className={css.sidebar}>
        <header>
          <div className={css.tagline}>Corsali Engineering Challenge</div>
          <h1>Fun With Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s explore files in JavaScript. What could be more fun than
            rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://corsali.com/join">Corsali</a>
            &nbsp;—&nbsp;Fullstack Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@corsali.com
          </div>
        </footer>
      </aside>

      <Hidden mdUp={true} implementation="js">
        <Drawer 
          anchor={'right'} 
          open={activeFile != null} 
          onClose={() => {
            setActiveFile(null)
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div style={{
            padding: '0 20px 20px 20px',
            width: '100vw'
          }}>
            <div style={{
              padding: '10px 0px'
            }}>
              <Button
                color="primary"
                size="small"
                startIcon={<BackArrowIcon />}
                onClick={() => {
                  setActiveFile(null)
                }}
              >
                back
              </Button>
            </div>
            {renderFileView()}
          </div>
        </Drawer>
      </Hidden>

      <main className={css.editorWindow}>
        {renderFileView()}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;
