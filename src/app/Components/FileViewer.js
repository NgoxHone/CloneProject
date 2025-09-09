import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import RNFileViewer from 'react-native-file-viewer';
import RNBlobUtil from 'react-native-blob-util';

const FileViewer = ({fileName, filePath}) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleOpen = async () => {
    if (!filePath) {
      Alert.alert('Lỗi', 'Không tìm thấy đường dẫn file!');
      return;
    }
    let localPath = filePath;
    // Nếu là URL thì tải về cache
    if (/^https?:\/\//.test(filePath)) {
      try {
        setDownloading(true);
        const ext = filePath.split('.').pop().split('?')[0];
        const destPath = `${RNBlobUtil.fs.dirs.CacheDir}/${Date.now()}.${ext}`;
        const res = await RNBlobUtil.config({path: destPath}).fetch(
          'GET',
          filePath,
        );
        if (res && (await RNBlobUtil.fs.exists(destPath))) {
          localPath = destPath;
        } else {
          throw new Error('Tải file thất bại!');
        }
      } catch (e) {
        setDownloading(false);
        Alert.alert('Không thể tải file', e?.message || 'Lỗi không xác định');
        return;
      }
      setDownloading(false);
    }
    try {
      await RNFileViewer.open(localPath, {showOpenWithDialog: true});
    } catch (e) {
      console.log('Lỗi mở file:', e);
      Alert.alert('Không thể mở file', e?.message || 'Lỗi không xác định');
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOpen}
      disabled={downloading}>
      <Text style={styles.icon}>📄</Text>
      <Text style={styles.text}>{fileName}</Text>
      {downloading && (
        <ActivityIndicator
          size="small"
          color="#0984e3"
          style={{marginLeft: 8}}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginVertical: 4,
  },
  icon: {fontSize: 20, marginRight: 8},
  text: {fontSize: 16},
});

export default FileViewer;
