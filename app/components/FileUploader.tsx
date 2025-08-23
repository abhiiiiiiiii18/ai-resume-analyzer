import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [dragActive, setDragActive] = useState(false);
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setDragActive(false);
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        onDragEnter: () => setDragActive(true),
        onDragLeave: () => setDragActive(false),
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full relative">
            {/* Enhanced gradient border with animation */}
            <div className={`relative p-1 rounded-3xl bg-gradient-to-r transition-all duration-500 ${
                isDragActive 
                    ? 'from-blue-500 via-purple-500 to-pink-500 shadow-2xl scale-[1.02]' 
                    : file 
                        ? 'from-emerald-400 via-blue-500 to-purple-500 shadow-lg'
                        : 'from-gray-300 via-blue-400 to-purple-400 shadow-md hover:shadow-lg'
            }`}>
                {/* Animated glow effect */}
                <div className={`absolute inset-0 rounded-3xl blur-xl transition-opacity duration-500 ${
                    isDragActive 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-50' 
                        : 'opacity-0'
                }`}></div>
                
                <div {...getRootProps()} className="relative">
                    <input {...getInputProps()} />

                    <div className={`bg-white rounded-3xl p-8 cursor-pointer transition-all duration-500 relative overflow-hidden ${
                        isDragActive ? 'bg-gradient-to-br from-blue-50 to-purple-50 scale-95' : 'hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50'
                    }`}>
                        
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>

                        {file ? (
                            <div 
                                className="relative z-10 flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border-2 border-emerald-200 shadow-lg group hover:shadow-xl transition-all duration-300" 
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Success animation */}
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-emerald-200 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                                        <div className="relative bg-white p-3 rounded-2xl shadow-lg border border-emerald-200">
                                            <img src="/images/pdf.png" alt="pdf" className="size-12" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-semibold text-emerald-700">Successfully uploaded</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-800 truncate max-w-xs mb-1">
                                            {file.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-600">{formatSize(file.size)}</p>
                                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            <p className="text-sm text-emerald-600 font-medium">Ready to analyze</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    className="group/btn p-3 hover:bg-rose-100 rounded-full transition-all duration-300 hover:scale-110" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFileSelect?.(null);
                                    }}
                                >
                                    <img src="/icons/cross.svg" alt="remove" className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                                </button>
                            </div>
                        ) : (
                            <div className="relative z-10 text-center space-y-6">
                                {/* Upload icon with animation */}
                                <div className="mx-auto w-20 h-20 relative">
                                    <div className={`absolute inset-0 bg-gradient-to-r rounded-2xl blur-lg transition-all duration-500 ${
                                        isDragActive 
                                            ? 'from-blue-400 to-purple-400 opacity-50 scale-110' 
                                            : 'from-gray-300 to-blue-300 opacity-20'
                                    }`}></div>
                                    <div className={`relative w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center transition-all duration-500 ${
                                        isDragActive ? 'scale-110 shadow-2xl' : 'hover:shadow-xl hover:scale-105'
                                    }`}>
                                        <img 
                                            src="/icons/info.svg" 
                                            alt="upload" 
                                            className={`size-12 transition-all duration-500 ${
                                                isDragActive ? 'scale-110' : ''
                                            }`} 
                                        />
                                    </div>
                                </div>

                                {/* Upload text with enhanced styling */}
                                <div>
                                    <h3 className={`text-2xl font-bold mb-2 transition-all duration-500 ${
                                        isDragActive 
                                            ? 'text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text' 
                                            : 'text-gray-800'
                                    }`}>
                                        {isDragActive ? 'Drop your resume here!' : 'Upload Your Resume'}
                                    </h3>
                                    
                                    <p className="text-lg text-gray-600 mb-4">
                                        <span className={`font-semibold transition-colors duration-300 ${
                                            isDragActive ? 'text-blue-600' : 'text-purple-600'
                                        }`}>
                                            Click to upload
                                        </span> or drag and drop
                                    </p>
                                    
                                    <div className="flex items-center justify-center gap-2 text-base text-gray-500">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span>PDF only</span>
                                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                        <span>Max {formatSize(maxFileSize)}</span>
                                    </div>
                                </div>

                                {/* Feature highlights */}
                                <div className="flex items-center justify-center gap-8 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <span className="text-emerald-600 text-xs">⚡</span>
                                        </div>
                                        <span>Fast Analysis</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 text-xs">🔒</span>
                                        </div>
                                        <span>Secure & Private</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 text-xs">✨</span>
                                        </div>
                                        <span>AI-Powered</span>
                                    </div>
                                </div>

                                {/* Animated upload indicator */}
                                {isDragActive && (
                                    <div className="flex items-center justify-center gap-3 mt-6">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Pulse animation overlay when dragging */}
                        {isDragActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl animate-pulse"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUploader