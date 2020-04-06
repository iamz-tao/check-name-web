import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ButtonGroup, Button } from 'semantic-ui-react'
import Cropper from 'react-cropper'
import Head from 'next/head'

const CropImage = class extends React.PureComponent {
  rotateImage = (degree) => {
    if (typeof this.cropper === 'undefined') return
    this.cropper.rotate(degree)
  }

  handleCropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    this.cropper.getCroppedCanvas()
      .toBlob((blob) => {
        const { cropImage } = this.props
        cropImage(blob)
        // const data = new FormData()
      })
  }

  render() {
    const {
      open,
      imageSrc,
      handleOpenModal,
    } = this.props
    // console.log('rop>>',imageSrc)
    return (
      <Modal
        closeIcon
        open={open}
        onClose={() => handleOpenModal()}
      >
        <Head>
          <link
            href='/static/cropper.min.css'
            rel='stylesheet'
          />
        </Head>
        <Modal.Header>Crop Image</Modal.Header>
        <Modal.Content>
          <Cropper
            style={{
              height: 400,
              width: '100%',
            }}
            preview='.img-preview'
            guides={false}
            aspectRatio={16 / 9}
            src={imageSrc}
            ref={(cropper) => {
              this.cropper = cropper
            }}
            setDragMode='crop'
            movable={false}
            center
          />
        </Modal.Content>
        <Modal.Actions>
          <ButtonGroup>
            <Button onClick={() => this.rotateImage(90)}>Rotate 90</Button>
            <Button onClick={() => this.rotateImage(-90)}>Rotate -90</Button>
          </ButtonGroup>
          <Button
            color='blue'
            onClick={() => this.handleCropImage()}
          >
            Crop
          </Button>
          <Button onClick={() => handleOpenModal()}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

CropImage.propTypes = {
  open: PropTypes.bool,
  imageSrc: PropTypes.string,
  cropImage: PropTypes.func,
  handleOpenModal: PropTypes.func,
}

CropImage.defaultProps = {
  open: false,
  imageSrc: '',
  cropImage: () => {
  },
  handleOpenModal: () => {
  },
}

export default CropImage
