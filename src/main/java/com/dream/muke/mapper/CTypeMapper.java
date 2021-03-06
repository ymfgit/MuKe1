package com.dream.muke.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.dream.muke.entity.CType;

/**
 * 课程类别表映射接口
 * @author dream
 *
 */
@Repository("cTypeMapper")
public interface CTypeMapper {
	/**
	 * 找到所有的课程类别
	 * @return
	 */
	public List<CType> findAllCourseType();

	/**
	 * 找到所有的方向
	 * @return
	 */
	public List<CType> findAllDir();

	/**
	 * 根据方向找到所有的类别
	 * @param key
	 * @return
	 */
	public List<CType> findTypeByDir(String key);
	
	//删除课程类别信息
	public int delCourseTypeInfo(Map<String, Object> map);

	//更改课程类别信息
	public int updateCourseTypeInfo(Map<String, Object> map);

	//添加课程类别信息
	public int addCourseTypeInfo(Map<String, Object> map);
	
	/**
	 * 前台部分
	 */
	/**
	 * 根据用户是否关注，学习情况查找所学的课程的课程类型
	 * @param map
	 * @return
	 */
	public List<CType> findByMap(Map<String, Object> map);
}
